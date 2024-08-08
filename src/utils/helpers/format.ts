// Một hàm để chuyển đổi các tham số thành chuỗi
export function toQueryString(params: Record<string, any>): string {
  // Chuyển đổi tất cả các giá trị thành chuỗi, và loại bỏ các thuộc tính undefined
  const stringParams: Record<string, string> = Object.fromEntries(
    Object.entries(params).map(([key, value]) => [
      key,
      value === undefined ? "" : String(value),
    ])
  );

  return new URLSearchParams(stringParams).toString();
}
