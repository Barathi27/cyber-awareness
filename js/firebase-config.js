(function () {
  // If Firebase is already initialized, don't initialize again
  if (window.firebaseApp) {
    window.firebaseReady = Promise.resolve(window.firebaseApp);
    return;
  }

  const FIREBASE_SDK_VERSION = "10.14.1";

  const firebaseConfig = {
    apiKey: "AIzaSyC8mBZdPQ63SdkYfDfojGTM0UW01LABheQ",
    authDomain: "csp-fake-news-detection.firebaseapp.com",
    projectId: "csp-fake-news-detection",
    storageBucket: "csp-fake-news-detection.firebasestorage.app",
    messagingSenderId: "176529947945",
    appId: "1:176529947945:web:5286334773c01467668b38"
  };

  function loadScript(src) {
    return new Promise(function (resolve, reject) {

      // Don't load the same script twice
      const existingScript =
        document.querySelector('script[src="' + src + '"]');

      if (existingScript) {

        // If Firebase library is already available
        if (
          src.includes("firebase-app-compat") &&
          window.firebase
        ) {
          resolve();
          return;
        }

        if (
          src.includes("firebase-auth-compat") &&
          window.firebase &&
          firebase.auth
        ) {
          resolve();
          return;
        }

        existingScript.addEventListener("load", resolve, {
          once: true
        });

        existingScript.addEventListener("error", function () {
          reject(
            new Error(
              "Failed to load Firebase SDK: " + src
            )
          );
        }, {
          once: true
        });

        return;
      }

      const script = document.createElement("script");

      script.src = src;

      script.onload = function () {
        resolve();
      };

      script.onerror = function () {
        reject(
          new Error(
            "Failed to load Firebase SDK: " + src
          )
        );
      };

      document.head.appendChild(script);
    });
  }

  async function initializeFirebase() {

    try {

      // ================================
      // LOAD FIREBASE APP
      // ================================

      await loadScript(
        "https://www.gstatic.com/firebasejs/" +
        FIREBASE_SDK_VERSION +
        "/firebase-app-compat.js"
      );

      // ================================
      // LOAD FIREBASE AUTH
      // ================================

      await loadScript(
        "https://www.gstatic.com/firebasejs/" +
        FIREBASE_SDK_VERSION +
        "/firebase-auth-compat.js"
      );

      // ================================
      // CHECK FIREBASE
      // ================================

      if (!window.firebase) {
        throw new Error(
          "Firebase library was not loaded."
        );
      }

      // ================================
      // INITIALIZE APP
      // ================================

      if (!firebase.apps.length) {

        window.firebaseApp =
          firebase.initializeApp(firebaseConfig);

      } else {

        window.firebaseApp =
          firebase.app();

      }

      console.info(
        "[CyberAware] Firebase + Authentication initialized:",
        firebaseConfig.projectId
      );

      return window.firebaseApp;

    } catch (error) {

      console.error(
        "[CyberAware] Firebase initialization failed:",
        error
      );

      throw error;
    }
  }

  // IMPORTANT:
  // Other pages can wait for Firebase using:
  // await window.firebaseReady;

  window.firebaseReady =
    initializeFirebase();

})();