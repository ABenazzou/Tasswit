import { TestBed, async, inject } from '@angular/core/testing';

import { VoteGuardGuard } from './vote-guard.guard';

describe('VoteGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoteGuardGuard]
    });
  });

  it('should ...', inject([VoteGuardGuard], (guard: VoteGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
