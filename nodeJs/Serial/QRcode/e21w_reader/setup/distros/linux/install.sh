#!/bin/bash

sudo systemctl disable e21w_reader

sudo cp -rf /home/if/e21w_reader/setup/distros/linux/services/e21w_reader.service /etc/systemd/system &&

sudo systemctl enable e21w_reader

sudo systemctl start e21w_reader
