import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PubSub } from '@google-cloud/pubsub';
import { FilaProducao } from './fila-producao.entity/fila-producao.entity';
import { CreatePedidoDto } from 'src/pedido/pedido.dto';
import { EditeFilaProducaoDto } from './fila-producao.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FilaProducaoService implements OnModuleInit {
  private pubSubClient = new PubSub();
  private topicName =  this.configService.get('TOPIC_STATUS_ATUALIZADO');
  private subscriptionName =  this.configService.get('SUBSCRIPTION_PEDIDO_REALIZADO');

  constructor(
    @InjectRepository(FilaProducao)
    private filaProducaoRepository: Repository<FilaProducao>,
    private configService: ConfigService,
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

  async findAll(): Promise<FilaProducao[]>{
    return this.filaProducaoRepository.find()
  }

  async editeStatusFilaProducao(id: number, editeFilaProducaoTdo: EditeFilaProducaoDto): Promise<FilaProducao>{
    await this.filaProducaoRepository.update(id, editeFilaProducaoTdo);
    return this.filaProducaoRepository.findOneBy({ id })
  }
}
