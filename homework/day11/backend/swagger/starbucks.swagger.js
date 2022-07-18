/**
 * @swagger
 * /starbucks:
 *   get:
 *     summary: 커피 목록 가져오기
 *     tags: [Coffee]
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
 *                              example: 아메리카노
 *                          img:
 *                              type: string
 *                              example: https://image.istarbucks.co.kr/upload/store/skuimg/2021/02/[9200000002095]_20210225095033382.jpg
 * 
 */