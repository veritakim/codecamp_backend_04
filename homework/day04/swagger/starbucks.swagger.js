/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 커피 메뉴 리스트 가져오기
 *     tags: [Menu]
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
 *                              example: 아이스커피
 *                          kcal:
 *                              type: int
 *                              example: 5
 *                    
 */

/**
 * @swagger
 * /starbucks:
 *   post:
 *     summary: 커피 메뉴 등록하기
 *     tags: [Menu]
 *     responses:
 *       200:
 *         description: 성공
 */