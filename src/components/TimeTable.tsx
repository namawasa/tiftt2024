import { createRef, useEffect, useState } from 'react'
import { Day } from '../type/Day'
import { Stage, stages } from '../type/Stage'
import { TimeTableInfo } from './TimeTableInfo'
import data from '../timetable2.json'
import styles from './TimeTable.module.css'
import { Mode } from '../type/Mode'
import { TimeTableChecked } from './TimeTableChecked'
import { getStageColor } from '../utils/stringUtil'
import { useScreenShot } from '../hooks/useScreenShot'
import { RiScreenshot2Fill } from 'react-icons/ri'
import { IoMdListBox } from 'react-icons/io'
import { FaCheck } from 'react-icons/fa'

export const TimeTable = (): JSX.Element => {
  const [day, setDay] = useState<Day>(1)
  const [mode, setMode] = useState<Mode>(1)
  const refMode1 = createRef<HTMLDivElement>()
  const refMode2 = createRef<HTMLDivElement>()
  const { image, takeScreenShot, error } = useScreenShot()

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

  const handleChangeDay = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDay(Number(e.target.value) as Day)
  }

  const handleChangeMode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMode(Number(e.target.value) as Mode)
  }

  const handleClickScreenShot = async () => {
    let node = null as HTMLElement | null
    if (mode === 1) {
      node = refMode1.current
    }
    if (mode === 2) {
      node = refMode2.current
    }

    await takeScreenShot(node)
  }

  useEffect(() => {
    if (image == null) return
    const a = document.createElement('a')
    a.href = image
    a.download = 'ttt24.png'
    a.click()
  }, [image])

  useEffect(() => {
    if (error) alert('エラーが発生しました。')
  }, [error])

  return (
    <>
      <div className={styles.main}>
        {mode === 1 &&
          <div id='stages' className={styles.stages} ref={refMode1}>
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
        }
        {mode === 2 &&
          <div ref={refMode2}>
            <TimeTableChecked day={day} />
          </div>
        }
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
            <button className={styles.screenshot} onClick={handleClickScreenShot}>
              <RiScreenshot2Fill size="36px" />
            </button>
            <input type="radio" id='modeAll' name='mode' value={1} onChange={handleChangeMode} checked={mode === 1} />
            <input type="radio" id='modeChecked' name='mode' value={2} onChange={handleChangeMode} checked={mode === 2} />
            <label
              className={styles.mode}
              htmlFor='modeAll'
              style={{
                border: `solid 5px ${mode === 1 ? 'green' : 'white'}`
              }}
            >
              <IoMdListBox size="36px" />
            </label>
            <label
              className={styles.mode}
              htmlFor='modeChecked'
              style={{
                border: `solid 5px ${mode === 2 ? 'green' : 'white'}`
              }}
            >
              <FaCheck size="36px" />
            </label>
          </div>
        </div>
      </div>
    </>
  );
}
