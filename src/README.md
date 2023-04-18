To run this code, make sure you have [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/) installed. If not, firstly please get them installed.

---

You can open a terminal and cd into the `src` directory. Open the `.env` file and change the environment variables as needed. 

The, Run:-

`docker-compose up --build`

 or 

`docker compose up --build` 

(Whichever runs in your system)

~~Now, you can go to `localhost:3000` to see the frontend running. Also, the backend would be running at `localhost:80`.~~

Now, you can check out all the things at a single port (`80`) ==> <br/>
For the mobile app, the website could be checked at `localhost/` (This website would be running inside the application).<br/>
For the admin console, the website could be checked ta `localhost/admin`. <br/>
For the backend, it could be checked at its url at `localhost/api`.

If you want to connect to mongodb directly via third party application, it would be running at port `27017`, and you can get your username and password for mongo in the `.env` file.

---
For checking various backend APIs, you can check out `localhost/api/docs` or `localhost/api/redoc` for an interactive UI and complete documentation of the APIs. 
> **(NOTE)**
>
> The above would work only if the backend if running in DEBUG mode. 
> 
> You can change the `BACKEND_DEBUG` mode by changing the DEBUG variable in the environment file.

---
For stopping the docker application from running, press `Ctrl + C` in the same terminal in which you started the docker containers.
If you want to delete the containers, use `docker-compose down` or `docker compose down`.
If you want to delete the MongoDB data too, use `docker-compose down -v` or `docker compose down -v`.

~ BHAV BERI