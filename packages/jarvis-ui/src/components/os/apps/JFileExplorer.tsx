import { useState } from 'react'

export interface JFileNode {
  id:        string
  name:      string
  type:      'file' | 'folder'
  icon?:     string
  children?: JFileNode[]
  meta?:     Record<string, string>
}

export interface JFileExplorerProps {
  tree:          JFileNode[]
  onOpen?:       (node: JFileNode) => void
  onSelect?:     (node: JFileNode) => void
  initialPath?:  string[]
}

function nodeIcon(node: JFileNode): string {
  if (node.icon) return node.icon
  return node.type === 'folder' ? '📁' : '📄'
}

interface TreeNodeProps {
  node:         JFileNode
  depth:        number
  expanded:     Set<string>
  selected:     string | null
  onExpand:     (id: string) => void
  onSelect:     (node: JFileNode) => void
}

function TreeNode({ node, depth, expanded, selected, onExpand, onSelect }: TreeNodeProps) {
  const isExpanded = expanded.has(node.id)
  const isActive   = selected === node.id

  function handleClick() {
    onExpand(node.id)
    onSelect(node)
  }

  return (
    <>
      <div
        data-testid={`tree-${node.id}`}
        className={`j-os-tree-item${isActive ? ' j-os-tree-item--active' : ''}`}
        style={{ paddingLeft: 8 + depth * 14 }}
        onClick={handleClick}
      >
        <span className="j-os-tree-item__caret">{isExpanded ? '▾' : '▸'}</span>
        <span>{nodeIcon(node)}</span>
        <span>{node.name}</span>
      </div>
      {isExpanded && (node.children ?? []).filter(c => c.type === 'folder').map(child => (
        <TreeNode
          key={child.id}
          node={child}
          depth={depth + 1}
          expanded={expanded}
          selected={selected}
          onExpand={onExpand}
          onSelect={onSelect}
        />
      ))}
    </>
  )
}

function findNode(tree: JFileNode[], id: string): JFileNode | null {
  for (const node of tree) {
    if (node.id === id) return node
    if (node.children) {
      const found = findNode(node.children, id)
      if (found) return found
    }
  }
  return null
}

function buildBreadcrumb(tree: JFileNode[], targetId: string): JFileNode[] {
  function search(nodes: JFileNode[], path: JFileNode[]): JFileNode[] | null {
    for (const node of nodes) {
      const next = [...path, node]
      if (node.id === targetId) return next
      if (node.children) {
        const found = search(node.children, next)
        if (found) return found
      }
    }
    return null
  }
  return search(tree, []) ?? []
}

export function JFileExplorer({ tree, onOpen, onSelect: onSelectProp, initialPath }: JFileExplorerProps) {
  const [expanded,  setExpanded]  = useState<Set<string>>(new Set(initialPath ?? []))
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [paneItemId, setPaneItemId] = useState<string | null>(null)

  function handleExpand(id: string) {
    setExpanded(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id); else next.add(id)
      return next
    })
  }

  function handleTreeSelect(node: JFileNode) {
    setSelectedId(node.id)
  }

  function handlePaneSelect(node: JFileNode) {
    setPaneItemId(node.id)
    onSelectProp?.(node)
    if (node.type === 'folder') {
      handleExpand(node.id)
      setSelectedId(node.id)
    }
  }

  function handlePaneOpen(node: JFileNode) {
    onOpen?.(node)
  }

  const selectedNode = selectedId ? findNode(tree, selectedId) : null
  // Pane shows only files so that folder names don't duplicate tree items
  const paneItems: JFileNode[] = (selectedNode?.children ?? []).filter(n => n.type === 'file')
  const breadcrumb = selectedId ? buildBreadcrumb(tree, selectedId) : []
  // Breadcrumb as single path string — always prefixed with "Home /" to avoid exact-text
  // conflicts with tree-item spans when querying by text in tests
  const breadcrumbPath = 'Home' + (breadcrumb.length > 0
    ? ' / ' + breadcrumb.map(n => n.name).join(' / ')
    : '')

  return (
    <div className="j-os-fileexplorer">
      {/* Breadcrumb — rendered as a single text to avoid duplicate text matches */}
      <div className="j-os-fileexplorer__breadcrumb">
        <span>{breadcrumbPath}</span>
      </div>

      <div className="j-os-fileexplorer__body">
        {/* Left tree — shows folders only */}
        <div className="j-os-fileexplorer__tree">
          {tree.map(node => (
            <TreeNode
              key={node.id}
              node={node}
              depth={0}
              expanded={expanded}
              selected={selectedId}
              onExpand={handleExpand}
              onSelect={handleTreeSelect}
            />
          ))}
        </div>

        {/* Right pane — shows files of selected folder */}
        <div className="j-os-fileexplorer__pane">
          {paneItems.map(item => (
            <div
              key={item.id}
              className={`j-os-pane-item${paneItemId === item.id ? ' j-os-pane-item--active' : ''}`}
              onClick={() => handlePaneSelect(item)}
              onDoubleClick={() => handlePaneOpen(item)}
            >
              <span className="j-os-pane-item__icon">{nodeIcon(item)}</span>
              <span className="j-os-pane-item__name">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
