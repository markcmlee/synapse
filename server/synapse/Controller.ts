/* eslint-disable import/extensions */

import { Router } from "express";
import Reply from "./Reply";

/** Generic wrapper for an Express router. Associates _endpoint templates_ in the format ```METHOD /path/:param``` with handler functions. */
export default class Controller {
  /** An Express router */
  router: Function;

  constructor() {
    this.router = Router();
  }

  /** Associates a callback function with an HTTP method and _resource path_
   * @param method An HTTP method
   * @param path A _route_ in the Express syntax - ex. '/user/:id'
   * @param callback A callback function
   */
  declare(method: string, path: string, callback: Function): void {
    this.router[method.toLowerCase()](path, (req, res) => res.send(callback, req.params));
  }

  /** _**(async)**_ Attempts to execute a request using the constructed router.
   * @param method An HTTP method
   * @param path A _resource path_
   * @param args An object containing the arguments to be passed to the callback method, if one is found.
   * @returns A promise that evaluates to the result of invoking the callback function associated with the provided method and path, or a ```NOT_FOUND``` {@linkcode Reply} if no matching _endpoint_ exists.
   */
  async request(method: string, path: string, args: object): Promise<any> {
    return new Promise((resolve) => {
      this.router(
        { method: method.toUpperCase(), url: path, body: args },
        {
          send: (callback, params) => resolve(callback({ ...args, ...params })),
        },
        () => resolve(Reply.NOT_FOUND())
      );
    });
  }
}
