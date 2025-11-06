export interface BaseUseCase<I, O> {
  execute(param?: I): Promise<O>;
}
