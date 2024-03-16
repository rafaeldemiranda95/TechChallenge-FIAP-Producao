<?php

namespace App\Console\Commands;

use Google\Cloud\PubSub\PubSubClient;
use Illuminate\Console\Command;

class PubSubListener extends Command
{
    // Topicos
    // techchallenge-fiap-producao
    // techchallenge-fiap-pagamento
    // techchallenge-fiap-pedido
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:pub-sub-listener';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        //
        $pubSub = new PubSubClient(['projectId' => env('FIREBASE_PROJECT_ID')]);

        $topic = $pubSub->topic('techchallenge-fiap-producao');

        // Publish a message to the topic.
        $topic->publish([
            'data' => 'My new message.',
            'attributes' => [
                'location' => 'Detroit'
            ]
        ]);

        // // Get an instance of a previously created subscription.
        // $subscription = $pubSub->subscription('my_subscription');

        // // Pull all available messages.
        // $messages = $subscription->pull();

        // foreach ($messages as $message) {
        //     echo $message->data() . "\n";
        //     echo $message->attribute('location');
        // }
    }
}
