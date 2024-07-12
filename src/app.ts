
import { Header } from "./components/header";
import { Router } from "./router";


class App {

  private router : Router;

  constructor () {
      this.router = new Router();
      new Header()
      window.addEventListener('DOMContentLoaded', this.handlerRouteChanging.bind(this));
      window.addEventListener('popstate', this.handlerRouteChanging.bind(this));
  }

  handlerRouteChanging () {
      this.router.openRoute();
  }
}

(new App())