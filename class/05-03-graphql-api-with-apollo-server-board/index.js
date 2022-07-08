// const { ApolloServer, gql } = require('apollo-server');
import {ApolloServer, gql} from 'apollo-server'
import { checkValidationPhone, getToken, sendTokenToSMS } from '../04-02-rest-api-with-express-board/phone.js';

// The GraphQL schema
const typeDefs = gql`
  type MyReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }

  type Query {
    fetchBoards:[MyReturn]
  }

  input CreateBoardInput {
    writer: String
    title: String
    contents: String
  }

  type Mutation {
    # createBoard: (
    #   writer: String
    #   title: String
    #   contents: String
    # )
    createBoard(createBoardInput: CreateBoardInput!): String
  }

  input CreateTokenOfPhoneInput {
    myPhone: String
  }

  type Mutation {
    createTokenOfPhone(createTokenOfPhoneInput: CreateTokenOfPhoneInput!): String
  }
`;

// A map of functions which return data for the schema.
const resolvers = {
  Query: {
    fetchBoards: (parent, args, context, info) => {
      // mutation createBoard에서 넘긴 사과가 넘어올 것이다. 
      // console.log(parent)

      // 1. 데이터를 조회하는 로직 - db에서 접속해서 데이터 꺼내오기
      const result = [
        { number: 1, writer: "짱구", title: "초코비 먹을사람", contents: "나 혼자 먹을겁니다 호호~잇" },
        { number: 2, writer: "흰둥이", title: "흰둥이 산책시킬 사람", contents: "산책 시켜주세요" },
        { number: 3, writer: "훈이", title: "훈이는 주먹밥", contents: "훈이 주먹밥" },
      ]

      // 2. 꺼내온 결과 응답주기.
      return result
    },
  },

  Mutation: {
    createBoard: (_, args) => {
      // 1. 데이터를 등록하는 로직 => 디비에 접속해서 데이터 저장하기
      console.log(args.createBoardInput.writer)
      console.log(args.createBoardInput.title)
      console.log(args.createBoardInput.contents)
      // 2. 저장한 결과 응답 돌려주기.
      return '게시물 등록에 성공했습니다!'

      // fetchBoards("사과")
    },

    createTokenOfPhone: (_, args) => {
      console.log(args.createTokenOfPhoneInput.myPhone)
      let myPhone = args.createTokenOfPhoneInput.myPhone
      const isValid = checkValidationPhone(myPhone)
      if (!isValid) return
    
      const myToken = getToken()
    
      sendTokenToSMS(myPhone, myToken)
    
      return '인증완료'
    } 
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  // cors: {
  //   origin: "http://naver.com"
  // },
  cors: true
});

server.listen(3000).then(({ url }) => {
  console.log(`프로그램을 켜는데 성공함 야호!!`);
});