const pool = require('../conf/db');
module.exports = {
  // 查询存放地点
  queryStoragePlace(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select resource.id, resource.name
        from resource, resource_type
        where resource.type_id = resource_type.id and resource_type.name = '存放地点'
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 查询经费来源
  queryFunds(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select resource.id, resource.name
        from resource, resource_type
        where resource.type_id = resource_type.id and resource_type.name = '经费来源'
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 查询采购组织形式
  queryOrganization(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select resource.id, resource.name
        from resource, resource_type
        where resource.type_id = resource_type.id and resource_type.name = '采购组织形式'
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 查询申购单位
  queryBuyer(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select resource.id, resource.name
        from resource, resource_type
        where resource.type_id = resource_type.id and resource_type.name = '申购单位'
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 通过 id 查询字典名
  queryResourceById(id, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select name
        from resource
        where id = ?
      `
      conn.query(sql, id, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 查询系统字典列表
  queryCurrentPageResourceList(page, size, cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select count(1) as totalCount from resource;

        select r.id, rt.name type, r.name name
        from resource as r
        left join resource_type as rt on rt.id = r.type_id
        order by r.id
        limit ?, ?;
      `
      conn.query(sql, [page, size], (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })
    })
  },
  // 查询资产类型
  queryResourceTypeList(cb) {
    pool.getConnection((err, conn) => {
      if (err) throw err
      const sql = `
        select * from resource_type;
      `
      conn.query(sql, (err, result) => {
        if (err) throw err
        cb(result)
        conn.release()
      })

    })
  }
}
