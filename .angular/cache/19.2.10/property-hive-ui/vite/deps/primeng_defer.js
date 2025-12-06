import {
  BaseComponent
} from "./chunk-B45BMHXQ.js";
import "./chunk-PVRCY3EF.js";
import "./chunk-7ZDG6LXI.js";
import "./chunk-GRE5C4UV.js";
import "./chunk-2XUDQHIN.js";
import "./chunk-RQIOO3G3.js";
import {
  isPlatformBrowser
} from "./chunk-FEDAEUWJ.js";
import {
  ContentChild,
  Directive,
  EventEmitter,
  NgModule,
  Output,
  TemplateRef,
  ViewContainerRef,
  inject,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵcontentQuery,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵgetInheritedFactory,
  ɵɵloadQuery,
  ɵɵqueryRefresh
} from "./chunk-N2CVKOQC.js";
import "./chunk-P6U2JBMQ.js";
import "./chunk-4MWRP73S.js";

// node_modules/primeng/fesm2022/primeng-defer.mjs
var Defer = class _Defer extends BaseComponent {
  /**
   * Callback to invoke when deferred content is loaded.
   * @param {Event} event - Browser event.
   * @group Emits
   */
  onLoad = new EventEmitter();
  template;
  documentScrollListener;
  view;
  viewContainer = inject(ViewContainerRef);
  ngOnInit() {
    super.ngOnInit();
    console.log("Defer is deprecated as of v18, use Angular defer block instead.");
  }
  ngAfterViewInit() {
    super.ngAfterViewInit();
    if (isPlatformBrowser(this.platformId)) {
      if (this.shouldLoad()) {
        this.load();
      }
      if (!this.isLoaded()) {
        this.documentScrollListener = this.renderer.listen(this.document.defaultView, "scroll", () => {
          if (this.shouldLoad()) {
            this.load();
            this.documentScrollListener && this.documentScrollListener();
            this.documentScrollListener = null;
          }
        });
      }
    }
  }
  shouldLoad() {
    if (this.isLoaded()) {
      return false;
    } else {
      let rect = this.el.nativeElement.getBoundingClientRect();
      let docElement = this.document.documentElement;
      let winHeight = docElement.clientHeight;
      return winHeight >= rect.top;
    }
  }
  load() {
    this.view = this.viewContainer.createEmbeddedView(this.template);
    this.onLoad.emit();
    this.cd.detectChanges();
  }
  isLoaded() {
    return this.view != null && isPlatformBrowser(this.platformId);
  }
  ngOnDestroy() {
    this.view = null;
    if (this.documentScrollListener) {
      this.documentScrollListener();
    }
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDefer_BaseFactory;
    return function Defer_Factory(__ngFactoryType__) {
      return (ɵDefer_BaseFactory || (ɵDefer_BaseFactory = ɵɵgetInheritedFactory(_Defer)))(__ngFactoryType__ || _Defer);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _Defer,
    selectors: [["", "pDefer", ""]],
    contentQueries: function Defer_ContentQueries(rf, ctx, dirIndex) {
      if (rf & 1) {
        ɵɵcontentQuery(dirIndex, TemplateRef, 5);
      }
      if (rf & 2) {
        let _t;
        ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
      }
    },
    outputs: {
      onLoad: "onLoad"
    },
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Defer, [{
    type: Directive,
    args: [{
      selector: "[pDefer]",
      standalone: true
    }]
  }], null, {
    onLoad: [{
      type: Output
    }],
    template: [{
      type: ContentChild,
      args: [TemplateRef]
    }]
  });
})();
var DeferModule = class _DeferModule {
  static ɵfac = function DeferModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DeferModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _DeferModule,
    imports: [Defer],
    exports: [Defer]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DeferModule, [{
    type: NgModule,
    args: [{
      imports: [Defer],
      exports: [Defer]
    }]
  }], null, null);
})();
export {
  Defer,
  DeferModule
};
//# sourceMappingURL=primeng_defer.js.map
