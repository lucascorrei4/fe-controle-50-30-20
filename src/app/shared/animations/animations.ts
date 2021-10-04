import {
  trigger,
  style,
  animate,
  transition,
  query,
  stagger,
  animateChild
} from '@angular/animations';

export const fadeAndMoveAnimation = trigger('fadeAndMoveAnimation', [
  transition(':leave', [
    style({ opacity: 1, height: '*', transform: 'translateY(0)' }),
    animate(
      '0.4s cubic-bezier(0.215, 0.610, 0.355, 1)',
      style({ opacity: 0, height: '0px', transform: 'translateY(-10px)' })
    )
  ]),
  transition(':enter', [
    style({ opacity: 0, height: '0px', transform: 'translateY(-10px)' }),
    animate(
      '0.4s cubic-bezier(0.215, 0.610, 0.355, 1)',
      style({ opacity: 1, height: '*', transform: 'translateY(0)' })
    )
  ])
]);

export const fadeAndMoveFooterAnimation = trigger('fadeAndMoveFooterAnimation', [
  transition(':leave', [
    style({ opacity: 1, height: '*', transform: 'translateY(0)' }),
    animate(
      '0.4s cubic-bezier(0.215, 0.610, 0.355, 1)',
      style({ opacity: 0, height: '0px', transform: 'translateY(100px)' })
    )
  ]),
  transition(':enter', [
    style({ opacity: 0, height: '0px', transform: 'translateY(100px)' }),
    animate(
      '0.4s cubic-bezier(0.215, 0.610, 0.355, 1)',
      style({ opacity: 1, height: '*', transform: 'translateY(0)' })
    )
  ])
]);

export const botaoFlutuanteAnimation = trigger('botaoFlutuanteAnimation', [
  transition(':leave', [
    style({ opacity: 1, transform: 'scale(1)' }),
    animate(
      '0.4s cubic-bezier(0.215, 0.610, 0.355, 1)',
      style({ opacity: 0, transform: 'scale(0)' })
    )
  ]),
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0)' }),
    animate(
      '0.4s cubic-bezier(0.215, 0.610, 0.355, 1)',
      style({ opacity: 1, transform: 'scale(1)' })
    )
  ])
]);

export const expand = trigger('expand', [
  transition(':leave', [
    style({ transform: '*', 'transform-origin': 'top' }),
    animate('.3s ease-out', style({ transform: 'scaleY(0)' }))
  ]),
  transition(':enter', [
    style({ transform: 'scaleY(0)', 'transform-origin': 'top' }),
    animate('.3s ease-in', style({ transform: '*' }))
  ])
]);

export const fade = trigger('fade', [
  transition(':leave', [style({ opacity: 1 }), animate('0.5s ease-out', style({ opacity: 0 }))]),
  transition(':enter', [style({ opacity: 0 }), animate('0.5s ease-in', style({ opacity: 1 }))])
]);

export const items = trigger('items', [
  transition(':enter', [
    style({ transform: 'scale(0.5)', opacity: 0 }),
    animate('1s cubic-bezier(.8, -0.6, 0.2, 1.5)', style({ transform: 'scale(1)', opacity: 1 }))
  ])
]);

export const list = trigger('list', [
  transition(':enter', [query('@items', stagger(300, animateChild()), { optional: true })])
]);
