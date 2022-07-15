/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 인증번호 받기
 *     tags: [Tokens]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone: 
 *                 type: string
 *     responses:
 *       200:
 *         description: 성공
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 휴대폰번호 인증하기
 *     tags: [Tokens]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone: 
 *                 type: string
 *               token: 
 *                 type: string
 *     responses:
 *       200:
 *         description: 성공
 */