interface IController<T> {
  handle: (data: T) => Promise<HttpResponse>;
}
