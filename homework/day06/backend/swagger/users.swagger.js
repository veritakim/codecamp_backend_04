/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원 리스트 가져오기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *              schema:
 *                  type: array
 *                  items:
 *                      properties:
 *                          email:
 *                              type: string
 *                              example: kkk@c.com
 *                          name:
 *                              type: string
 *                              example: 홍길동
 *                          phone:
 *                              type: string
 *                              example: 010-1111-2222
 *                          personal:
 *                              type: string
 *                              example: 020201-3241523
 *                          prefer:
 *                              type: string
 *                              example: naver.com
 * 
 *                    
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 회원 등록하기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 */