// Register all the ng-generated tags in your application so that a-frame
// recognizes them as one of it its own, and thus properly inserts them into the
// scene.  If ng tags are not registered with a-frame then ng will only insert
// them into to the DOM but *not* into the a-frame scene.
// A-frame's 'registerPrimitive' *must* be called in angular's polyfill.js after
// 'aframe.js' and before 'zone.js'.
// https://stackoverflow.com/questions/50712687/a-frame-and-angular-6-view-partials-inserted-into-dom-but-not-into-scene

AFRAME.registerPrimitive('a-game', { mappings: {} }); //<- specify all your ng tags starting here
AFRAME.registerPrimitive('a-menu', { mappings: {} });
AFRAME.registerPrimitive('a-single-player-menu', { mappings: {} });
AFRAME.registerPrimitive('a-party-menu', { mappings: {} });