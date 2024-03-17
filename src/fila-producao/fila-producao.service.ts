import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PubSub } from '@google-cloud/pubsub';
import { FilaProducao } from './fila-producao.entity/fila-producao.entity';
import { CreatePedidoDto } from 'src/pedido/pedido.dto';

@Injectable()
export class FilaProducaoService implements OnModuleInit {
  private pubSubClient = new PubSub();
  private topicName = process.env.TOPIC_STATUS_ATUALIZADO || 'topic-status-atualizado';
  private subscriptionName = process.env.SUBSCRIPTION_PEDIDO_REALIZADO || 'subscription-pedido-realizado';

  constructor(
    @InjectRepository(FilaProducao)
    private filaProducaoRepository: Repository<FilaProducao>,
  ) { }

  async onModuleInit() {
    this.listenForPedidoRealizadoMessages();
  }

  private listenForPedidoRealizadoMessages() {
    const subscription = this.pubSubClient.subscription(this.subscriptionName);

    subscription.on('message', async message => {
      console.log('Recebida mensagem:', message.data.toString());
      const pedidoData: CreatePedidoDto = JSON.parse(message.data.toString());

      await this.addPedidoToFila(pedidoData);
      message.ack();
    });

    subscription.on('error', error => {
      console.error('Erro ao receber mensagem:', error);
    });
  }

  async addPedidoToFila(createPedidoDto: CreatePedidoDto): Promise<FilaProducao> {
    const filaProducao = this.filaProducaoRepository.create({
      status: 'pendente',
      pedidoId: createPedidoDto.id,
    });

    const savedFilaProducao = await this.filaProducaoRepository.save(filaProducao);

    await this.processarPedidoNaFila(savedFilaProducao);

    return savedFilaProducao;
  }

  private async processarPedidoNaFila(filaProducao: FilaProducao) {
    filaProducao.status = 'completo';
    await this.filaProducaoRepository.save(filaProducao);
    await this.publicarStatusPedidoAtualizado(filaProducao);
  }

  private async publicarStatusPedidoAtualizado(filaProducao: FilaProducao) {
    const message = {
      pedidoId: filaProducao.pedidoId,
      status: filaProducao.status,
    };
    const dataBuffer = Buffer.from(JSON.stringify(message));
    try {
      await this.pubSubClient.topic(this.topicName).publish(dataBuffer);
      console.log(`Mensagem publicada no tópico ${this.topicName}`);
    } catch (error) {
      console.error(`Erro ao publicar mensagem: ${error.message}`);
    }
  }
}
