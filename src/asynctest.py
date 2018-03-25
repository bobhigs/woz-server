import asyncio
import websockets
import signal
import sys
import json

import RPi.GPIO as GPIO
import time

max = 15
min = 7

loop = asyncio.get_event_loop() 
uri = 'ws://10.240.228.30:8083'
messages = []
connections = []
speed = 0

GPIO.setmode(GPIO.BOARD)
GPIO.setup(12, GPIO.OUT)
p = GPIO.PWM(12, 110)

async def handleMessages():
	async with websockets.connect(uri) as socket:
		global messages
		global connections
		global speed
		connections.append(socket)
		while True:
			message = await socket.recv()
			print(message)
			messages.append(message)
			parsed = json.loads(message)
			if parsed['type'] == 'SET_SPEED':
				speed = parsed['payload']

def speedToServo(speed):
	diff = max - min
	return (speed * diff) + min


async def doesStuff():
	global messages
	p.start(1)
	length = 0
	while True:
		print("speed to servo", speedToServo(speed))
		p.ChangeDutyCycle(speedToServo(speed))
		print("speed: ", speed)
		if len(messages) > length:
			for i in range(length, len(messages)):
				print("recieved: " + messages[i])
				length = len(messages)
		await asyncio.sleep(.1)

def signal_handler(signal, frame):  
    loop.stop()
    GPIO.cleanup()
    for con in connections:
    	con.close()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)


asyncio.ensure_future(handleMessages())
asyncio.ensure_future(doesStuff())
loop.run_forever()
