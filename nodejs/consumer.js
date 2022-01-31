const amqp = require('amqplib');

const exchange_name = 'backend_service_node_3';
const queue_name ='authorization_node_3';


async function local_queue(){
    var channel = null
    try {
        const connection = await  amqp.connect('amqp://localhost:5672');
        channel = await connection.createChannel();
        await channel.assertQueue(queue_name);
        
        channel.bindQueue(
            queue_name,
            exchange_name,
            'customer.user.loggedin'
        )
        console.log("[>X] Listning .... ")

        channel.consume(queue_name, (message) => {
            console.log(message.content.toString());
            channel.ack(message)
        })
        
    } catch (error) {
        throw new (error);
    }finally{
        // await channel.connection.close();
    }

}


local_queue()