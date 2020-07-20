import './index.scss';
import App from 'app/App';

window.onload = () => {
  const appElement = document.getElementById('app');
  const app = new App(appElement);
  app.init(appElement);
};
