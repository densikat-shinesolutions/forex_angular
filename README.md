# Forex Trading Platform Demo with Angular 2

# How to set it up?


# First install Docker (I used ubuntu OS)

sudo apt install docker.io

sudo gpasswd -aG mike docker

sudo service docker restart

newgrp docker

#then pull a docker container with angular-cli installed


docker pull alexsuch/angular-cli

# How to run the docker container and start up the angular 2 whiteapp 

docker run -it --rm -w /app -v $(pwd):/app alexsuch/angular-cli ng new angular-demo


docker run -it --rm -w /app -v $(pwd)/angular-demo:/app alexsuch/angular-cli ng g component demo-component


docker run -it --rm -w /app -v $(pwd)/angular-demo:/app -p 4200:4200 alexsuch/angular-cli ng serve --host 0.0.0.0


# How to get into docker container

C=$(docker run -i -d alpine sh)
docker exec -it $C sh

docker exec -it $containerId sh

# How to generate classes, components 

ng generate class Account --spec

ng generate component portfolio

# How to install additional npm librairies like angular2 highcharts

npm install md-data-table

npm install ng2-currency-mask --save

npm install @angular/forms --save

npm install angular2-highcharts --save