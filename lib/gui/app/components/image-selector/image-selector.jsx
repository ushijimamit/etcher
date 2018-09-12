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

const React = require('react')
const ReactDOM = require('react-dom')
const propTypes = require('prop-types')
const Color = require('color')

const middleEllipsis = require('./../../utils/middle-ellipsis')

const styled = require('styled-components').default
const { Provider, Button } = require('rendition')

const shared = require('/./../../../../../lib/shared/units')
const { colors, consts } = require('./../../theme')
const { StepButton, StepNameButton, StepSelection,
  Footer, FooterUnderline, SizeText } = require('./../../styled-components')

class SelectImageButton extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      chosenImage: '',
      imageSize: ''
    }
  }

  static getDerivedStateFromProps (props, state) {
    state.chosenImage = middleEllipsis(props.getImageName || props.getImageBasename , 20)
    state.imageSize = shared.bytesToClosestUnit(props.getImageSize)
    return state
  }


  render () {
    if (this.props.hasImage){
      return (
        <Provider>
          <StepSelection>
            <StepNameButton
              plaintext
              onClick={() => this.props.showSelectedImageDetails()}
              tooltip={this.props.getImageBasename}
            >
              {this.state.chosenImage}
            </StepNameButton>
            <SizeText>
              {this.state.imageSize}
            </SizeText>
            { this.props.flashing ?
              null
              :
              <Button className={'button button-link step-footer'}
                plaintext
                onClick={() => this.props.reselectImage()}
              >
                Change
              </Button>
            }
          </StepSelection>
        </Provider>
      )
    }
    else {
      return (
        <Provider>
          <StepSelection>
            <StepButton
              primary
              onClick={() => this.props.openImageSelector()}
            >
              Select image
            </StepButton>
            <Footer>
              { ::this.props.mainSupportedExtensions.join(', ') }, and
              <FooterUnderline
                tooltip={ ::this.props.extraSupportedExtensions.join(', ') }
              >
                {' '}others
              </FooterUnderline>
            </Footer>
          </StepSelection>
        </Provider>
      )
    }
  }
}

SelectImageButton.propTypes = {
  openImageSelector: propTypes.func,
  mainSupportedExtensions: propTypes.array,
  extraSupportedExtensions: propTypes.array,
  hasImage: propTypes.bool,
  showSelectedImageDetails: propTypes.func,
  getImageName: propTypes.string,
  getImageBasename: propTypes.string,
  reselectImage: propTypes.func,
  flashing: propTypes.bool,
  getImageSize: propTypes.number,
}

module.exports = SelectImageButton
