export { default } from "./ModalWrapperComponent"

/* ModalWrapper Component
    modalStyle 종류 : noneStyle, purpleGradientStyle
    ※ 기본은 noneStyle 입니다.

    visible 옵션이 있는 경우 false 를 넣어주시면 됩니다.
    ※ 기본은 true 입니다.

    titleText - modal의 title

    wrapperCustomStyle - wrapper에 style을 변경하고자 하는 경우 예시처럼 style을 입력해주시면 됩니다.
    titleCustomStyle - title에 style을 변경하고자 하는 경우 예시처럼 style을 입력해주시면 됩니다.
    contentCustomStyle - content에 style을 변경하고자 하는 경우 예시처럼 style을 입력해주시면 됩니다.

<ModalWrapper
    modalStyle="purpleGradientStyle"
    titleText="Ebue"
    wrapperCustomStyle={{'width':'500px', 'background-color':'#ccc'}}
    titleCustomStyle={{'color':'black', 'font-size':'30px'}}
    contentCustomStyle={{'padding':'30px'}}
>
    {'Child'}
</ModalWrapper>
*/
