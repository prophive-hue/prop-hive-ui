import { Directive, Input, TemplateRef, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appVirtualScroll]',
  standalone: true
})
export class VirtualScrollDirective implements OnInit, OnDestroy {
  @Input() appVirtualScroll: any[] = [];
  @Input() itemHeight = 50;
  @Input() containerHeight = 400;

  private destroy$ = new Subject<void>();
  private visibleItems: any[] = [];
  private startIndex = 0;
  private endIndex = 0;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  ngOnInit() {
    this.calculateVisibleItems();
    this.renderItems();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private calculateVisibleItems() {
    const visibleCount = Math.ceil(this.containerHeight / this.itemHeight) + 2;
    this.endIndex = Math.min(this.startIndex + visibleCount, this.appVirtualScroll.length);
    this.visibleItems = this.appVirtualScroll.slice(this.startIndex, this.endIndex);
  }

  private renderItems() {
    this.viewContainer.clear();
    this.visibleItems.forEach((item, index) => {
      this.viewContainer.createEmbeddedView(this.templateRef, {
        $implicit: item,
        index: this.startIndex + index
      });
    });
  }

  onScroll(event: Event) {
    const target = event.target as HTMLElement;
    const scrollTop = target.scrollTop;
    const newStartIndex = Math.floor(scrollTop / this.itemHeight);
    
    if (newStartIndex !== this.startIndex) {
      this.startIndex = newStartIndex;
      this.calculateVisibleItems();
      this.renderItems();
    }
  }
}