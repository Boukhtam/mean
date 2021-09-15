const Moment = require('moment');
const { extendMoment } = require('moment-range');

/**
 * getDaysInAMonth.
 *
 * @param {String} year
 * @param {String} month
 *
 * @returns {Object} {week, calendar} 
 */
module.exports.getDaysInAMonth = (year = +moment().format("YYYY"), month = +moment().format("MMM") - 1) => {
	const moment = extendMoment(Moment);
	const startDate = moment(`${month}-${year}`, "MMM-YYYY");

	const firstDay = moment(startDate).startOf('month')
	const endDay = moment(startDate).endOf('month')

	const monthRange = moment.range(firstDay, endDay)
	const weeks = [];
	const days = Array.from(monthRange.by('day'));

	days.forEach(it => {
		const week = it.week();
		const idx = weeks.findIndex(w => w.number === week);
		if (idx > -1) {
			weeks[idx].days.push(it);
		} else {
			weeks.push({number: week, days: [it]})
		}
	})

	const calendar = []
	weeks.forEach(week => {
		const firstWeekDay = moment(`${month}-${year}`, "MMM-YYYY").week(week.number).day(1) /*startOf("week");*/
		const lastWeekDay = moment(`${month}-${year}`, "MMM-YYYY").week(week.number).day(7) /*endOf("week");*/

		const weekRange = moment.range(firstWeekDay, lastWeekDay)
		calendar.push(Array.from(weekRange.by('day')));
	})

	return { calendar, weeks, days };
}
