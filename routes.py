#!/usr/bin/env python3

from flask import Flask, render_template, request, session
from flask.ext.socketio import SocketIO, emit

def create_app():
    app = Flask(__name__)
    app.config.update(dict(
        DEBUG=True,
        SECRET_KEY='development key'
    ))
    return app

app = create_app()
socketio = SocketIO(app)

def socket_connect():
    #assign buzzer number, setup connections
    pass

@socketio.on('add_question', namespace='/events')
def next_question(message):
    emit('add_question', { 'index' : message['index'] }, broadcast=True)

@socketio.on('pong', namespace='/events')
def pong(message):
    print("Pong ", message)
    emit('pong', message, broadcast=True);

@socketio.on('ping', namespace='/events')
def ping(message):
    print("Ping", message)
    emit('ping', message, broadcast=True)

@socketio.on('answer', namespace='/events')
def answer(message):
    print("answer", message)
    emit('answer', message, broadcast=True)

@app.route('/')
def index():
    return render_template('student.html')

@app.route('/teacher')
def teacher():
    return render_template('teacher.html')


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0')
