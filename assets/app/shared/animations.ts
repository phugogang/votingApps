import {state, style, trigger, animate, transition, keyframes} from '@angular/animations';

export const showStateTrigger = trigger('showState', [
    transition(':enter', [
       animate('500ms ease-out', keyframes([
           style({
               opacity: 0,
               transform: 'translateX(-100%)'
           }),
           style({
                opacity: 0.5,
                transform: 'translateX(15%)',
                offset: 0.4
           }),
           style({
               opacity: 1,
               transform: 'translateX(0)',
               offset: 1
           })
       ]))
    ]),
])


export const hoverTrigger = trigger('hoverMouse', [
    state('void', style({
        'translate': 'scale(0)'
    })),

    state('mouseEnter', style({
        'border': '1px solid blue',
        'box-shadow': '3px 3px 2px #888888'
    })),
    
    state('mouseLeave', style({
        'translate': 'scale(0)'
    }))

])

export const itemStateTrigger = trigger('itemState', [
    transition(':enter', [
      animate('500ms ease-out', keyframes([
          style({
              opacity: 0,
              transform: 'translateX(-100%)',
              offset: 0
          }),

          style({
              opacity: 1,
              transform: 'translateX(15%)',
              offset: 0.4
          }),

          style({
              opacity: 1,
              transform: 'translateX(0)',
              offset: 1
          })
      ]))
    ])
])


export const itemStateTriggerRight = trigger('itemStateRight', [
    transition(':enter', [
      animate('500ms ease-out', keyframes([
          style({
              opacity: 0,
              transform: 'translateX(100%)',
              offset: 0
          }),

          style({
              opacity: 1,
              transform: 'translateX(-15%)',
              offset: 0.4
          }),

          style({
              opacity: 1,
              transform: 'translateX(0)',
              offset: 1
          })
      ]))
    ])
])


export const itemStateTriggerTop = trigger('itemStateTop', [
    transition(':enter', [
      animate('500ms ease-out', keyframes([
          style({
              opacity: 0,
              transform: 'translateY(-100%)',
              offset: 0
          }),

          style({
              opacity: 1,
              transform: 'translateY(15%)',
              offset: 0.4
          }),

          style({
              opacity: 1,
              transform: 'translateY(0)',
              offset: 1
          })
      ]))
    ])
])