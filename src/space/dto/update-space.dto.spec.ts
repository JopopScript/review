import { CustomValidateMessage } from "@/common/custom-validate-message";
import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { UpdateSpaceDto } from "./update-space.dto";

describe('UpdateSpaceDto', () => {
  it('정상처리: Dto에 맞는 형식으로 모두 들어온 경우', async () => {
    //given
    const requestDto = {
      name: '용인1섹터입고',
      inputEnable: true,
      outputEnable: false,
      storeEnable: false
    };
    const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

    //when
    const errors = await validate(requestDtoObj);

    //then
    expect(errors.length).toBe(0);
  });

  it('정상처리: Dto에 맞는 형식으로 2개만 들어온 경우', async () => {
    //given
    const requestDto = {
      inputEnable: true,
      storeEnable: false
    };
    const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

    //when
    const errors = await validate(requestDtoObj);

    //then
    expect(errors.length).toBe(0);
  });

  it('에러발생: 2개이상이 형식에 맞지 않는 경우', async() => {
    //given
    const requestDto = {
      name: '',
      inputEnable:'true',
    };
    const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

    //when
    const errors = await validate(requestDtoObj);

    //then
    expect(errors.length).toBe(2);
    expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isNotEmpty({
      value: '',
      property: 'name'
    }));
    expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isBoolean({
      value: 'true',
      property: 'inputEnable'
    }));
  });

  describe('name field validation', () => {
    it('에러발생: 빈문자열인 경우', async() => {
      //given
      const requestDto = {
        name: '',
      };
      const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isNotEmpty({
        value: '',
        property: 'name'
      }));
    });

    it('에러발생: 문자열이 아닌경우', async() => {
      //given
      const requestDto = {
        name: 123,
      };
      const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isString({
        value: 123,
        property: 'name'
      }));
    });

    it('에러발생: 길이가 20을 초과하는 경우', async() => {
      //given
      const requestDto = {
        name: '12345678901234567890123',
      };
      const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);
      
      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.maxLength({
        value: '12345678901234567890123',
        property: 'name',
        constraints: [20],
      }));
    });
  });

  describe('inputEnable field validation', () => {
    it('에러발생: boolean이 아닌 경우', async() => {
      //given
      const requestDto = {
        inputEnable: 'true',
      };
      const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isBoolean({
        value: 'true',
        property: 'inputEnable',
      }));
    });
  });

  describe('outputEnable field validation', () => {
    it('에러발생: boolean이 아닌 경우', async() => {
      //given
      const requestDto = {
        outputEnable: 123,
      };
      const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isBoolean({
        value: 123,
        property: 'outputEnable',
      }));
    });
  });

  describe('storeEnable field validation', () => {
    it('에러발생: boolean이 아닌 경우', async() => {
      //given
      const requestDto = {
        storeEnable: {}
      };
      const requestDtoObj = plainToInstance(UpdateSpaceDto, requestDto);

      //when
      const errors = await validate(requestDtoObj);

      //then
      expect(errors.length).toBe(1);
      expect(JSON.stringify(errors)).toContain(CustomValidateMessage.isBoolean({
        value: {},
        property: 'storeEnable',
      }));
    });
  });
});