import React, { Context } from "react"
import Helmet, { HelmetData } from "react-helmet"
import PropTypes from "prop-types"
import Document, { Main, NextScript, DocumentContext, DocumentInitialProps } from "next/document"
import { ServerStyleSheet } from "styled-components"

interface DocumentProps {
  styleTags: any
  helmet: HelmetData
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(context: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const page = context.renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return { ...page, helmet: Helmet.renderStatic(), styleTags }
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet
    const htmlAttrs = htmlAttributes.toComponent()
    const bodyAttrs = bodyAttributes.toComponent()

    return (
      <html {...htmlAttrs}>
        <head>
          {this.props.styleTags}
          {Object.values(helmet).map(el => el.toComponent())}
        </head>
        <body {...bodyAttrs}>
          <Main />
          {process.env.NODE_ENV === "production" && (
            <script src='https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated' />
          )}
          <NextScript />
        </body>
      </html>
    )
  }
}
// Main => _app.tsx
export default MyDocument
