export function delay(time: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function generateSkip(current?: string, pageSize?: string) {
  const page = current ? parseInt(current) : 1;
  const skip = pageSize ? parseInt(pageSize) : 10;
  const take = (page - 1) * skip;
  return {
    page: isNaN(page) ? 1 : page,
    skip: isNaN(take) ? 0 : take,
    take: isNaN(skip) ? 10 : skip,
  };
}

export function generatePagenation(
  total: number,
  current: number,
  pageSize: number,
) {
  const totalPage = Math.ceil(total / pageSize);
  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    pages.push(i);
  }
  return {
    totalPage,
    pages,
  };
}
