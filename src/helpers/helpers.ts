export const dateFormatter = (date:Date) => {
  const year = date.getFullYear().toString();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();
  if(month.length === 1) {
    month = '0' + month;
  }
  if(day.length === 1) {
    day = '0' + day;
  }
  return `${year}-${month}-${day}`
};

export const sortData = (data: {x: string, y: string | null}[], payload: {x: string, y: string | null}) => {
  const dataArr = [...data];
      dataArr.push(payload);
      dataArr.sort((a,b) => {
        const axAxis = a.x.split('-').map(i => +i);
        const bxAxis = b.x.split('-').map(i => +i);
        const aDate = new Date(+axAxis[0], (+axAxis[1] - 1), +axAxis[2]);
        const bDate = new Date(+bxAxis[0], (+bxAxis[1] - 1), +bxAxis[2])
        return aDate.getTime() - bDate.getTime();
      })
  return dataArr;
};

export const countDaysDiff = (from: Date, to: Date) => {
  return (to.getTime() - from.getTime()) / (1000 * 3600 * 24);
}

export const filterData = (data: {id: string, data: {x: string, y: string | null}[]}[], chartType: 'core' | null, from: string, to: string) => {
  const mainFiller = [
    { x: '1970-01-13', y: 'Severely Elevated' },
    { x: '1970-01-14', y: 'Moderately Elevated' },
    { x: '1970-01-15', y: 'Mildly Elevated' },
    { x: '1970-01-16', y: 'Stable' },
    { x: '1970-01-17', y: 'Mildly Depressed' },
    { x: '1970-01-18', y: 'Moderately Depressed' },
    { x: '1970-01-19', y: 'Severely Depressed' },
    { x: '1970-01-20', y: null },
  ];
  switch(chartType) {
    case 'core': 
      const mainCopy = [...data];
      const objCopy = Object.assign({}, mainCopy[0]);
      const dataCopy = [...objCopy.data]
      const filtered = objCopy.data.filter(obj => {
        const date = obj.x.split('-');
        const fromDate = from.split('-');
        const toDate = to.split('-');
        return (new Date(+date[0], (+date[1] - 1), +date[2]).getTime() >= new Date(+fromDate[0], (+fromDate[1] - 1), +fromDate[2]).getTime() && 
                new Date(+date[0], (+date[1] - 1), +date[2]).getTime() <= new Date(+toDate[0], (+toDate[1] - 1), +toDate[2]).getTime());
      })
      objCopy.data = mainFiller.concat(filtered);
      mainCopy.splice(0, 1, objCopy);
      return mainCopy;
    default:
      break; 
  }
}