declare namespace NESTADMIN {
  type PageResponseVo = {
    /** Logger模块-分页数据 */
    records: Logger;
    /** Logger模块-当前页 */
    current: number;
    /** Logger模块-分页大小 */
    pageSize: number;
    /** Logger模块-分页数 */
    total: number;
    /** Logger模块-分页数 */
    pageCount: number;
  };
}
