import './main.css'
import getProteinSelection from './proteinCardAction'
import getBrothSelection from './brothCardAction'
import { autoScroll } from './autoScroll'
import ramengoLogo from './src/assets/logo.png'
import deliveryGirl from './src/assets/entregadora.png'
import yellowBaloon from './src/assets/balao-amarelo.png'
import blueBaloon from './src/assets/balao-azul.png'
import inactiveSalt from './src/assets/salt/inactive.png'
import activeSalt from './src/assets/salt/active.png'
import inactiveShoyu from './src/assets/shoyu/inactive.png'
import activeShoyu from './src/assets/shoyu/active.png'
import inactiveMiso from './src/assets/miso/inactive.png'
import activeMiso from './src/assets/miso/active.png'
import inactivePork from './src/assets/pork/inactive.png'
import activePork from './src/assets/pork/active.png'
import inactiveYasai from './src/assets/yasai/inactive.png'
import activeYasai from './src/assets/yasai/active.png'
import inactiveChicken from './src/assets/chicken/inactive.png'
import activeChicken from './src/assets/chicken/active.png'




document.querySelector('#app').innerHTML = `
    <div id="main-content">
        <div id="hero-container">
            <nav>
                <img src="${ramengoLogo}" alt="Logo Ramen GO!">
            </nav>
            <div id="hero-bundle">
                <div class="hero-text-bundle">
                    <div class="hero-text-title">
                        <h1>ラーメン</h1>
                        <h2>go!</h2>
                    </div>
                    
                    <div class="hero-text-btn">
                        <p>Enjoy a good ramen in the comfort of your house. 
                        Create your own ramen and choose your favorite flavour
                        combination!</p>
                        <button id="orderNow">order now<i class="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>

                <div id="hero-ilustrations">
                    <div class="elipse"></div>
                    
                    <div class="hero-ilustrations-bundle">
                        <div class="blue-baloon">
                            <img src="${blueBaloon}" alt="Ilustração balão azul">
                        </div>
                        <div class="delivery">
                            <img src="${deliveryGirl}" alt="Ilustração entregadora">
                        </div>
                        <div class="yellow-baloon">
                            <img src="${yellowBaloon}" alt="Ilustração balão amarelo">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="order-container">
            <!-- broth choice -->
            <div id="broth-order">
                <div class="order-instruction">
                    <h3>First things first: select your favorite broth.</h3>
                    <h6>It will give the whole flavor on your ramen soup.</h6>
                </div>
                <div id="order-bundle">
                    <div id="order-choice">
                        <div class="option-card" card-active-img="${activeSalt}" card-inactive-img="${inactiveSalt}">
                            <img src="${inactiveSalt}" alt="ícone saleiro azul e vermelho">
                            <h4>Salt</h4>
                            <p>Simple like the seawater, nothing more</p>
                            <h3>US$ 10</h3>
                        </div>
                        <div class="option-card" card-active-img="${activeShoyu}" card-inactive-img="${inactiveShoyu}">
                            <img src="${inactiveShoyu}" alt="ícone garrafa de soju azul e amarelo">
                            <h4>Shoyu</h4>
                            <p>The good old and traditional soy sauce</p>
                            <h3>US$ 10</h3>
                        </div>
                        <div class="option-card" card-active-img="${activeMiso}" card-inactive-img="${inactiveMiso}">
                            <img src="${inactiveMiso}" alt="ícone tigela de sopa tipo miso">
                            <h4>Miso</h4>
                            <p>Paste made of fermented soybeans</p>
                            <h3>US$ 12</h3>
                        </div>
                    </div>
                </div>
                <!-- end broth choice -->
            </div>

            <!-- meat choice -->
            <div id="meat-order">
                <div class="order-instruction">
                    <h3>It's time to choose (or not) your meat!</h3>
                    <h6>Some people love, some don't. We have options for all tastes.</h6>
                </div>
                <div id="order-bundle">
                    <div id="order-choice">
                        <div class="option-card" card-active-img="${activePork}" card-inactive-img="${inactivePork}">
                            <img src="${inactivePork}" alt="ícone bife de carne de porco">
                            <h4>Chasu</h4>
                            <p>A sliced flavorful pork meat with a selection of season vegetables</p>
                            <h3>US$ 10</h3>
                        </div>
                        <div class="option-card" card-active-img="${activeYasai}" card-inactive-img="${inactiveYasai}">
                            <img src="${inactiveYasai}" alt="ícone opção vegetariana">
                            <h4>Yasai</h4>
                            <p>A delicious vegetarian lamen with a selection of season vegetables</p>
                            <h3>US$ 10</h3>
                        </div>
                        <div class="option-card" card-active-img="${activeChicken}" card-inactive-img="${inactiveChicken}">
                            <img src="${inactiveChicken}" alt="ícone de coxinha de frango">
                            <h4>Karaague</h4>
                            <p>Three units of fried chicken, moyashi, ajitama egg and other vegetables</p>
                            <h3>US$ 12</h3>
                        </div>
                        
                    </div>
                    
                </div>
                <!-- end meat choice -->
            </div>
            <div id="btn-checkout">
                <button id="checkOut">place my order<i class="fa-solid fa-arrow-right"></i> </button>
            </div>
        </div>
    </div>
    
`
document.addEventListener('DOMContentLoaded', function() {
    autoScroll();
    getBrothSelection();
    getProteinSelection();
});