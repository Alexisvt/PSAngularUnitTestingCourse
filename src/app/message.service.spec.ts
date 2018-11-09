import { MessageService } from './message.service';

describe('MessageService', () => {
  let service: MessageService;

  it('should have no message to start', () => {
    // arrange
    service = new MessageService();

    // assert
    expect(service.messages.length).toBe(0);
  });

  it('should add a message when add is called', () => {
    // arrange
    service = new MessageService();

    // act
    service.add('message1');

    expect(service.messages.length).toBe(1);
  });

  it('should remove all messages when clear is called', () => {
    // arrange
    service = new MessageService();
    service.add('message1');

    // act
    service.clear();

    // assert
    expect(service.messages.length).toBe(0);
  });
});
