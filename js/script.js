'use strict';

function initCountdown(parent, to, timerEndMessage) {

	let decCache = [],//функция для склонения имен, склонять как 1 день, три дня, пять дней (склонение числительных в javaScript, функция в поиске гугл declOfNum)
		decCases = [2, 0, 1, 1, 1, 2];
	function decOfNum(number, titles) {
		if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
		return titles[decCache[number]];
	}

    function addLeadingZero(d) {// подставляет 0 перед одиночной цифрой
        return (d < 10) ? '0' + d : d;
    }

	let timer;
	parent && to ? timer = setInterval(countdown, 1000) : null;//если таймер закончился, выдаст null

	function countdown() {//ТАЙМЕР РАСЧЕТ ВЕДЕТ В СЕКУНДАХ
		let toCountDate;//будущая дата
		to ? toCountDate = new Date(to) : console.error('Countdown error: no toCountDate mentioned');//(более короткий вариант)
		let currentDate = new Date();//сегодня
      
		let totalSeconds = Math.floor((toCountDate - currentDate) / 1000);//разница дат в секундах

		const seconds = totalSeconds % 60;
		const minutes = Math.floor((totalSeconds / 60) % 60);
		const hours = Math.floor((totalSeconds / 3600) % 24);
		const days = Math.floor((totalSeconds / 86400));
		// Math.floor округляет в нижнюю сторону
		const rootElements = document.querySelectorAll(parent);// родительский класс таймера

		if (rootElements.length > 0) {
			rootElements.forEach(root => {
				if (days > 0 && root.querySelector('.days')) {//проверка на наличие класса в html и если дней < 0, то блок с днями удаляется из разметки
					root.querySelector('.days .num').textContent = addLeadingZero(days);
					root.querySelector('.days .name').textContent = decOfNum(days, ['день', 'дня', 'дней']);
				} else {
					root.querySelector('.days').style.display = 'none';
				}

				if (root.querySelector('.hours')) {//проверка на наличие класса в html
					root.querySelector('.hours .num').textContent = addLeadingZero(hours);
					root.querySelector('.hours .name').textContent = decOfNum(hours, ['час', 'часа', 'часов']);
				}

				if (root.querySelector('.minutes')) {
					root.querySelector('.minutes .num').textContent = addLeadingZero(minutes);
					root.querySelector('.minutes .name').textContent = decOfNum(minutes, ['минута', 'минуты', 'минут']);
				}

				if (root.querySelector('.seconds')) {
					root.querySelector('.seconds .num').textContent = addLeadingZero(seconds);
					root.querySelector('.seconds .name').textContent = decOfNum(seconds, ['секунда', 'секунды', 'секунд']);
				}

				if (days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0) {//если таймер закончился, удаляем таймер и выводим сообщение 'The timer is over'
					clearInterval(timer);
					root.textContent = timerEndMessage;
				}
			})
		} else {
			console.error('Countdown error: no parent mentioned');//не передали родителя при вызове
		}
	}

	countdown();
}

initCountdown('.countdown', '27 Jan 2025 12:30', 'The timer is over');//для каждого нового вызова передавать класс таймера и конечную дату в формате '29 Jun 2025 17:28'
// (сутки === 86 400 000мс) (1 час === 3 600 000 милисекунд)

/* 
добавить разметку в html

<div class="timer">
	<div class="timer__title">COUNTDOWN</div>
	<div class="timer__wrapper">
		<div class="countdown">
			<div class="days">
				<p class="num">0</p>
				<span class="name">День</span>
			</div>
			<div class="hours">
				<p class="num">0</p>
				<span class="name">Часов</span>
			</div>
			<div class="minutes">
				<p class="num">0</p>
				<span class="name">Минут</span>
			</div>
			<div class="seconds">
				<p class="num">0</p>
				<span class="name">Секунды</span>
			</div>
		</div>
	</div>
</div>

*/