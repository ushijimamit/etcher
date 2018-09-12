/*
 * Copyright 2016 resin.io
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict'

const styled = require('styled-components').default
const { colors, consts } = require('./theme')
const {
  Button, Box, Txt
} = require('rendition') // eslint-disable-line object-curly-newline

exports.StepButton = styled(Button) `
  width: 100%;
  max-width: ${consts.btnMaxWidth};
  margin: auto;

  overflow: hidden;
`

exports.StepNameButton = styled(Button) `
  display: flex;
  justify-content: center;
  align-items: center;
  height: 39px;
  width: 100%;
  font-weight: bold;
  color: #fff;

  &:hover, &:focus, &:active{
    color: ${colors.primary.foreground};
  }
`

exports.StepSelection = styled(Box) `
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  color: $palette-theme-dark-foreground;
`

exports.Footer = styled(Txt) `
  margin-top: 10px;
  color: #787c7f;
  font-size: 10px;
`

exports.FooterUnderline = styled(Txt.span) `
  margin-top: 10px;
  color: #787c7f;
  font-size: 10px;
  border-bottom: 1px dotted;
  padding-bottom: 2px;
`

exports.SizeText = styled(Txt) `
  color: ${colors.dark.disabled.foreground};
  margin-bottom: 10px;
`
