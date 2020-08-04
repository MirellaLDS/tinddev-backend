const { Schema, model } = require("mongoose");

/**
 * @swagger
 *  components:
 *    schemas:
 *      Dev:
 *        type: object
 *        required:
 *          - name
 *          - user
 *          - avatar
 *        properties:
 *          name:
 *            type: string
 *          user:
 *            type: string
 *            description: Username github
 *          bio:
 *            type: string
 *            description: bio github
 *          avatar:
 *            type: string
 *            description: Avatar dp perfil github
 *          likes:
 *            summary: Id dos usuários que deram like
 *            type: array
 *            items:
 *              type: string
 *          dislikes:
 *            summary: Id dos usuários que deram dislikes
 *            type: array
 *            items:
 *              type: string
 *        example:
 *           name: Mirella Lins
 *           user: MirellaLDS
 *           bio: Android Development
 *           avatar: https://exampletindev-backend.herokuapp.com/
 *           likes: ["123456","78945"]
 *           dislikes: ["3216"]
 */

const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    user: {
      type: String,
      required: true
    },
    bio: String,
    avatar: {
      type: String,
      requireq: true
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Dev"
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = model("Dev", DevSchema);
