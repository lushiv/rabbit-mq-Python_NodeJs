import json
import queue
import pika


exchange_name = 'backend_service_node_3'
queue_name ='authorization_node_3'


connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()


def callback(ch, method, properties, body):
    print (body)
    # payload = json.loads(body)
    # print (payload)
    # process your payload according to your  business logic 
    ch.basic_ack(delivery_tag=method.delivery_tag) 

channel.basic_consume(
    queue = queue_name,
    on_message_callback=callback,
    auto_ack= False
)

print ("Listning ....")
channel.start_consuming()
