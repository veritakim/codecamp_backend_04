/**
 * @swagger
 * /users:
 *   get:
 *     summary: 회원 목록 가져오기
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
 *                          name:
 *                              type: string
 *                              example: 홍길동
 *                          email:
 *                              type: string
 *                              example: abc123@naver.com
 *                          personal:
 *                              type: string
 *                              example: 990802-*******
 *                          pwd:
 *                              type: string
 *                              example: 12345
 *                          phone:
 *                              type: string
 *                              example: 01008020127
 *                          prefer:
 *                              type: string
 *                              example: https://www.naver.com
 *                          og:
 *                              type: object
 *                              properties: 
 *                                  title: 
 *                                      type: string
 *                                      example: Naver
 *                                  description: 
 *                                      type: string
 *                                      example: 네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요
 *                                  image: 
 *                                      type: string
 *                                      example: https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png
 * 
 * 
 */

/**
 * @swagger
 * /user:
 *   post:
 *     summary: 회원 등록하기
 *     tags: [User]
 *    
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: 
 *                 type: string
 *                 example: 홍길동
 *               email: 
 *                 type: string
 *                 example: hong123@naver.com
 *               personal: 
 *                 type: string
 *                 example: 020201-3434213
 *               pwd: 
 *                 type: string
 *                 example: hong123
 *               phone: 
 *                 type: string
 *                 example: "01094149231"
 *               prefer: 
 *                 type: string
 *                 example: https://www.naver.com
 *     responses:
 *       200:
 *         description: 성공
 */