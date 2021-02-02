import OPi.GPIO as GPIO

print("test python GPIO")

#GPIO.setmode(GPIO.BOARD)

GPIO.setup(13, GPIO.IN, pull_up_down=GPIO.PUD_UP)

if GPIO.input(channel):
    print('Input was HIGH')
else:
    print('Input was LOW')