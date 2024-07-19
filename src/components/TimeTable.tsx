import { useState } from 'react'
import { Day } from '../type/Day'
import { Stage, stages } from '../type/Stage'
import { TimeTableInfo } from './TimeTableInfo'
import data from '../timetable2.json'
import styles from './TimeTable.module.css'
// import html2canvas from 'html2canvas'

export const TimeTable = (): JSX.Element => {
  const [day, setDay] = useState<Day>(1)
  // const [isOpen, setIsOpen] = useState(false)
  // const [capture, setCapture] = useState<string | undefined>(undefined)

  const getSelectedDayInfo = () => {
    switch (day) {
      case 1:
        return data.day1
      case 2:
        return data.day2
      case 3:
        return data.day3
    }
  }

  const getInfo = (stage: Stage) => {
    switch (stage) {
      case 'HOT STAGE':
        return getSelectedDayInfo()['HOT STAGE']
      case 'HEAT GARAGE':
        return getSelectedDayInfo()['HEAT GARAGE']
      case 'SMILE GARDEN':
        return getSelectedDayInfo()['SMILE GARDEN']
      case 'DOLL FACTORY':
        return getSelectedDayInfo()['DOLL FACTORY']
      case 'SKY STAGE':
        return getSelectedDayInfo()['SKY STAGE']
      case 'DREAM STAGE':
        return getSelectedDayInfo()['DREAM STAGE']
      case '浮島STAGE':
        return getSelectedDayInfo()['浮島STAGE']
    }
  }

  const getStageColor = (stage: Stage) => {
    switch (stage) {
      case 'HOT STAGE':
        return '#fa6c6c'
      case 'HEAT GARAGE':
        return '#ff9c26'
      case 'SMILE GARDEN':
        return '#b1d502'
      case 'DOLL FACTORY':
        return '#39c960'
      case 'SKY STAGE':
        return '#6dc8f9'
      case 'DREAM STAGE':
        return '#5f6ade'
      case '浮島STAGE':
        return '#f2bb01'
    }
  }

  const handleChangeDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(Number(e.target.value) as Day)
  }

  // const save = () => {
  //   const element = document.getElementById('stages') as HTMLElement
  //   element.removeAttribute('style')
  //   html2canvas(element).then(canvas => {
  //     setCapture(canvas.toDataURL())
  //     const dialogElem = document.getElementById('dialog') as HTMLDialogElement
  //     dialogElem.showModal()
  //   }).finally(() => {
  //     element.setAttribute('style', 'overflow-x: scroll;')
  //   })
  // }

  // const dialogClose = () => {
  //   const dialogElem = document.getElementById('dialog') as HTMLDialogElement
  //   dialogElem.close()
  // }

  return (
    <>
      <div className={styles.main}>
        <div id='stages' className={styles.stages}>
          {stages.map(stage => (
            <div key={stage} className={styles.stage} style={{ backgroundColor: getStageColor(stage) }}>
              <div
                className={styles.header}
                style={{ backgroundColor: getStageColor(stage) }}
              >
                <span>{stage}</span>
              </div>
              {getInfo(stage as Stage).map((info, index) => (
                <TimeTableInfo
                  key={index}
                  day={day}
                  stage={stage as Stage}
                  info={info}
                />
              ))}
            </div>
          ))}
        </div>
        <div className={styles.footer}>
          <div className={styles.days}>
            <input type="radio" id='day1' name='day' value={1} onChange={handleChangeDay} checked={day === 1} />
            <input type="radio" id='day2' name='day' value={2} onChange={handleChangeDay} checked={day === 2} />
            <input type="radio" id='day3' name='day' value={3} onChange={handleChangeDay} checked={day === 3} />
            <label
              className={styles.day}
              htmlFor='day1'
              style={{
                backgroundColor: '#ff89c4',
                border: `solid 5px ${day === 1 ? 'green' : '#ff89c4'}`
              }}
            >
              2日
            </label>
            <label
              className={styles.day}
              htmlFor='day2'
              style={{
                backgroundColor: '#5bbbd8',
                border: `solid 5px ${day === 2 ? 'green' : '#5bbbd8'}`
              }}
            >
              3日
            </label>
            <label
              className={styles.day}
              htmlFor='day3'
              style={{
                backgroundColor: '#89c76c',
                border: `solid 5px ${day === 3 ? 'green' : '#89c76c'}`
              }}
            >
              4日
            </label>
          </div>
          <div className={styles.setting}>

          </div>
        </div>
      </div>
      {/* <dialog id='dialog'>
        <img src={capture} width='500px' height='500px' />
        <button onClick={dialogClose}>閉じる</button>
      </dialog> */}
    </>
  );
}
