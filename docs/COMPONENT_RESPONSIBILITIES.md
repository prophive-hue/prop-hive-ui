# Component Responsibilities

## Component Categories

### 1. Smart Components (Containers)
**Location**: `features/*/` directories
**Responsibilities**:
- Data fetching and state management
- Business logic coordination
- Service injection and API calls
- Route parameter handling
- Child component orchestration

**Examples**:
- `PropertiesComponent` - Manages property list, pagination, search
- `InvestorDashboardComponent` - Coordinates dashboard data
- `AdminStatsComponent` - Handles analytics data

### 2. Presentation Components (Dumb)
**Location**: `shared/components/` and feature-specific components
**Responsibilities**:
- UI rendering only
- Input/Output communication
- No direct service calls
- Pure functions for data transformation

**Examples**:
- `CardPropertyComponent` - Displays property card
- `PaginatorComponent` - Handles pagination UI
- `GalleryComponent` - Image display

### 3. Layout Components
**Location**: `features/*/layout/` and `shared/components/`
**Responsibilities**:
- Page structure and navigation
- Common UI elements (header, footer, sidebar)
- Route outlet management

**Examples**:
- `AdminLayoutComponent` - Admin panel structure
- `HeaderComponent` - Site navigation
- `FooterComponent` - Site footer

### 4. Dialog/Modal Components
**Location**: `features/*/dialog/`
**Responsibilities**:
- Form handling and validation
- Modal state management
- Data submission to parent

**Examples**:
- `DialogPropertyCreateComponent` - Property creation form
- `DialogInvestorVerifyComponent` - Investor verification

## Responsibility Matrix

| Component Type | Data Fetching | State Management | Business Logic | UI Rendering | Service Injection |
|---------------|---------------|------------------|----------------|--------------|-------------------|
| Smart         | ✅            | ✅               | ✅             | ✅           | ✅                |
| Presentation  | ❌            | ❌               | ❌             | ✅           | ❌                |
| Layout        | ❌            | ❌               | ❌             | ✅           | ⚠️ (Auth only)    |
| Dialog        | ❌            | ⚠️ (Form only)   | ⚠️ (Validation)| ✅           | ❌                |

## Best Practices

### Smart Components
- Keep business logic in services
- Use OnPush change detection
- Handle loading states
- Implement error handling
- Manage subscriptions properly

### Presentation Components
- Use @Input() for data
- Use @Output() for events
- No direct DOM manipulation
- Pure functions only
- Stateless when possible

### Communication Patterns
- Parent → Child: @Input()
- Child → Parent: @Output()
- Sibling → Sibling: Service/State management
- Cross-feature: Route navigation

## Anti-Patterns to Avoid
- Presentation components making HTTP calls
- Smart components handling detailed UI logic
- Direct DOM manipulation in components
- Tight coupling between unrelated components
- Business logic in templates