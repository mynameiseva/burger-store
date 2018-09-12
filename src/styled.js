import styled, { injectGlobal } from 'styled-components'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

injectGlobal`
  body {
    font-family: 'Roboto', sans-serif; 
    margin: 0;
    padding: 0;
    text-decoration: none;
  }
  li {
    list-style: none;
  }
`

export const Container = styled.div`
  width: 80%;
  margin: 0 auto;
`

export const CustomButton = styled(Button).attrs({
  variant: 'contained',
  color: 'primary',
  size: 'medium'
})``

export const BurgerNameInput = styled(TextField).attrs({
  required: true,
  margin: 'normal',
  placeholder: 'Type burger`s name'
})``

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContentItems = styled.div`
  display: flex;  
`


