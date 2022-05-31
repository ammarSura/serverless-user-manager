import { Source } from '../../db/data-source';



test('checks if Data Source is initialised', async () => {
    expect(
        
        (await Source()).isInitialized
    ).toBe(true)
  });


