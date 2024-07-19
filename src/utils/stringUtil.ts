import { Day } from "../type/Day"
import { Info } from "../type/Info"
import { Stage } from "../type/Stage"

export const getKey = (day: Day, stage: Stage, info: Info) => {
    return `${day}${stage}${info.start}`
}

export const formatTime = (start: string, end: string) => {
    return `${start.slice(0, 2)}:${start.slice(2, 4)}〜${end.slice(0, 2)}:${end.slice(2, 4)}`
}

export const getStageColor = (stage: Stage) => {
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
