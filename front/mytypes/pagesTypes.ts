import { Store } from "redux"
import { NextPageContext } from "next"

export interface Context extends NextPageContext {
  // store : {getState() : StoreState}
  store: Store
}
