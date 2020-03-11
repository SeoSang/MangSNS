module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    "Hashtag",
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_general_ci",
    },
  )
  Hashtag.associate = db => {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" }) // 다대다 관계는 사이 테이블이 생겨야한다.
  }
  return Hashtag
}
