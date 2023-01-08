// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {

  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  struct Course {
    uint id; // 32
    uint price; // 32
    bytes32 proof; // 32
    address owner; // 20
    State state; // 1
  }

// mapping of courseHash to Course data
  mapping(bytes32 => Course) private ownedCourses;

  // mapping of courseID to courseHash
  mapping(uint => bytes32) private ownedCourseHash;

  // number of all courses + id of the course
  uint private totalOwnedCourses;

  address payable private owner;

  constructor() {
    setContractOwner(msg.sender);
  }

  /// Course has invalid state!
  error InvalidState();

  /// Course is not created!
  error CourseIsNotCreated();

  /// Course has already a Owner!
  error CourseHasOwner();

   /// Only owner has an access!
  error OnlyOwner();

  modifier onlyOwner() {
    if (msg.sender != getContractOwner()) {
      revert OnlyOwner();
    }
    _;
  }

  function purchaseCourse(
    bytes16 courseId, // 0x00000000000000000000000000003130
    bytes32 proof // 0x0000000000000000000000000000313000000000000000000000000000003130
  )
    external
    payable
  {
    // course id - 10
    // 0x00000000000000000000000000003130
    // 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
    // 000000000000000000000000000031305B38Da6a701c568545dCfcB03FcB875f56beddC4
    // keccak256 - c4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
              // - c4eaa3558504e2baa2669001b43f359b8418b44a4477ff417b4b007d7cc86e37
    bytes32 courseHash = keccak256(abi.encodePacked(courseId, msg.sender));

    if (hasCourseOwnership(courseHash)) {
      revert CourseHasOwner();
    }

    uint id = totalOwnedCourses++;

    ownedCourseHash[id] = courseHash;
    ownedCourses[courseHash] = Course({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender,
      state: State.Purchased
    });
  }

  function activateCourse(bytes32 courseHash)
    external
    onlyOwner
  {
    if (!isCourseCreated(courseHash)) {
      revert CourseIsNotCreated();
    }

    Course storage course = ownedCourses[courseHash];

    if (course.state != State.Purchased) {
      revert InvalidState();
    }

    course.state = State.Activated;
  }

   function transferOwnership(address newOwner)
    external
    onlyOwner
  {
    setContractOwner(newOwner);
  }

  function getCourseCount()
    external
    view
    returns (uint)
  {
    return totalOwnedCourses;
  }

   function getContractOwner()
    public
    view
    returns (address)
  {
    return owner;
  }

  function getCourseHashAtIndex(uint index)
    external
    view
    returns (bytes32)
  {
    return ownedCourseHash[index];
  }

  function getCourseByHash(bytes32 courseHash)
    external
    view
    returns (Course memory)
  {
    return ownedCourses[courseHash];
  }

 function setContractOwner(address newOwner) private {
    owner = payable(newOwner);
  }

   function isCourseCreated(bytes32 courseHash)
    private
    view
    returns (bool)
  {
    return ownedCourses[courseHash].owner != 0x0000000000000000000000000000000000000000;
  }

  function hasCourseOwnership(bytes32 courseHash)
    private
    view
    returns (bool)
  {
    return ownedCourses[courseHash].owner == msg.sender;
  }
}