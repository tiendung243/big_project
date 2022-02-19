Install require:
+ mysql 8.0.28
+ python 3.8

setup

+ mysql:
create user 
user name: tiendung
password : 2431999

create database itlearn5, grand permission to user access itlearn5.


+ start elasticsearch
cd elasticsearch-7.12.0-linux-x86_64
./bin/elasticsearch


cd it_learn
pip install virtualenv
virtualenv venv

source venv/bin/activate

pip install -r requirements.txt

python manage.py migrate
python manage.py runserver



